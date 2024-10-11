export const starColor = {
  1: '#FF1D1D',
  2: '#FF8C22',
  3: '#F8CE00',
  4: '#46C34C',
  5: '#479F78',
};

export const starHoverColor = {
  1: '#FF9999',
  2: '#FFB570',
  3: '#FFE870',
  4: '#B2E6B4',
  5: '#479F7899',
};

export const appId = (process.env.NEXT_PUBLIC_WORLD_APP_ID as `app_${string}`)!;
export const actionId = process.env.NEXT_PUBLIC_WORLD_ACTION_ID!;