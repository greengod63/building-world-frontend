
export type chatBarCardProps = chatBarCardType;

export type chatBarCardType = {
  avatar: string | null,
  lastMessage: string,
  name: string,
  unreadMessages: number | undefined | null,
  chatId: number
}