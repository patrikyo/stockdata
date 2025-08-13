interface FollowStockItemProps {
  name: string;
  ticker: string;
  isFollowed: boolean;
  onToggle: (name: string) => void;
}
export default FollowStockItemProps;
