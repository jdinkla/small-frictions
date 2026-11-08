import { readFile, writeFile } from 'node:fs/promises';
const source=await readFile(new URL('../docs/logbook.md', import.meta.url),'utf8');
const body=source.replace(/^# Manager’s log\s*/, '');
await writeFile(new URL('../site/src/content/manager-log.md', import.meta.url),`---\ntitle: Manager’s log\n---\n\n${body}`);
