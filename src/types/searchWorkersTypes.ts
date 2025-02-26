export type workerResponse = {
    ok: boolean;
    description: string;
    result: [
      {
        id: number;
        user_id: number;
        position: string;
        name: string;
        avatar_link: string;
      }
    ];
  };