"""Check deployed-path links, fragments, font URLs and publication metadata."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import re, json, xml.etree.ElementTree as ET
root=Path(__file__).resolve().parents[1]
site=root/'site/dist'
base=json.loads((root/'shots/pages.json').read_text())['base']
class Page(HTMLParser):
    def __init__(self,text):
        super().__init__();self.ids=set();self.links=[];self.titles=0;self.descriptions=0;self.feed(text)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.add(a['id'])
        if tag=='title':self.titles+=1
        if tag=='meta' and a.get('name')=='description':self.descriptions+=1
        for key in ('href','src'):
            if key in a:self.links.append(a[key])
errors=[]
pages={f:Page(f.read_text()) for f in site.rglob('*.html')}
for file,page in pages.items():
    if page.titles!=1 or page.descriptions!=1:errors.append(f'{file}: missing/duplicate title or description')
    text=file.read_text()
    if re.search(r'PROJECT_NAME|PROJECT_SLUG|lorem ipsum|Hello from island',text,re.I):errors.append(f'{file}: template placeholder')
    urls=page.links+re.findall(r'url\(([^)]+)\)',text)
    for raw in urls:
        raw=raw.strip('"\' ');u=urlsplit(raw)
        if u.scheme or u.netloc or raw.startswith('data:'):continue
        if u.path.startswith('/'):
            if u.path!=base and not u.path.startswith(base+'/'):
                errors.append(f'{file.relative_to(site)}: unprefixed path {raw}');continue
            target=site/unquote(u.path[len(base):]).lstrip('/')
        elif not u.path:target=file
        else:target=file.parent/unquote(u.path)
        if target.is_dir():target=target/'index.html'
        if not target.exists():errors.append(f'{file.relative_to(site)}: missing {raw}');continue
        if u.fragment and target.suffix=='.html':
            other=pages.get(target) or Page(target.read_text())
            if unquote(u.fragment) not in other.ids:errors.append(f'{file.relative_to(site)}: missing fragment {raw}')
for name in ('feed.xml','sitemap.xml'):
    try:ET.parse(site/name)
    except Exception as e:errors.append(f'{name}: {e}')
if errors:
    print('\n'.join(errors));raise SystemExit(1)
print(f'built guard: {len(pages)} HTML pages; links, fragments, local fonts, metadata and XML valid')
