export interface JournalType {
  path: string;
  key: string;
  textFile: string;
  author: 'arthur' | 'nghi';
}

export const journalMetadata: JournalType[] = [
  {
    path: 'tech-best-practice',
    key: 'tech-best-practice',
    textFile: 'techBestPractice',
    author: 'arthur',
  },
  {
    path: 'reflective-thinking',
    key: 'reflective-thinking',
    textFile: 'reflectiveThinking',
    author: 'arthur',
  },
];
