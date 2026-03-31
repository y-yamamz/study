import type { TodoList } from './types';

/**
 * マスタに設定されたHEXカラーコードをChip表示用のスタイルに変換する。
 * 背景・ボーダーは透過させ、テキストカラーは元色をそのまま使用する。
 * @param hex - "#RRGGBB" 形式のカラーコード（空文字の場合はグレー系を返す）
 */
export const toChipStyle = (hex: string) => {
  if (!hex) return { bg: '#f3f4f6', border: '#e5e7eb', text: '#6b7280' };
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return {
    bg:     `rgb(${Math.round(255 * 0.88 + r * 0.12)},${Math.round(255 * 0.88 + g * 0.12)},${Math.round(255 * 0.88 + b * 0.12)})`,
    border: `rgba(${r},${g},${b},0.35)`,
    text:   hex,
  };
};

/**
 * タスク行を一意に識別するキー文字列を生成する。
 * システムCD・プロジェクトCD・チケット番号の複合キー。
 */
export const getRowKey = (row: TodoList): string =>
  `${row.systemCd}_${row.projectCd}_${row.ticketNo}`;
