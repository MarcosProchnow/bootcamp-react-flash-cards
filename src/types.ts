export interface FlashCardData {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export type NewFlashCard = Pick<FlashCardData, 'title' | 'description'>;

export interface User {
  name: string;
}
