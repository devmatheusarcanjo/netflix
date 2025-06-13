import { ReactNode } from 'react';
import { DataPageInterface } from '../pages/dataPage/dataPages';

export interface LayoutPadraoInterface {
  dadosHeader: DataPageInterface;
  children: ReactNode;
}
