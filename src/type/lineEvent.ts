export interface LineEvent {
  events: Array<{
    replyToken: string;
    type: string;
    source: {
      type: "user" | "group" | "room";
      userId?: string;
      groupId?: string;
      roomId?: string;
    };
    message: {
      type: string;
      text: string;
    };
  }>;
}
