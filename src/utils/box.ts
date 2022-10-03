import { Box } from '../types';

export function boxIsEqual(box0: Box, box1: Box) {
  if (!box0 || !box1) {
    return false;
  }
  return box0.col === box1.col && box0.row === box1.row;
}
