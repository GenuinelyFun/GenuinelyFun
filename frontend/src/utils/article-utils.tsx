export interface ArticleType {
  path: string;
  key: string;
  textFile: string;
  author: 'arthur' | 'nghi';
}

export const articles: ArticleType[] = [
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
