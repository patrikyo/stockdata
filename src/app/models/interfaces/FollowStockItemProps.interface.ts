interface FollowStockItemProps {
  name: string;
  isFollowed: boolean;
  onToggle: (name: string) => void;
}
export default FollowStockItemProps;
