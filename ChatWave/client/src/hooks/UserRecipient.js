import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utilities/source";

export const UserRecipient = ({ chat, user }) => {
  const [recipientUser, setRecipientUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (chat && user) {
      const { members } = chat;
      const recepientId = members.find((id) => id !== user._id);

      if (!recepientId) {
        return null;
      }

      const fetchData = async () => {
        try {
          const response = await getRequest(`${baseUrl}/users/find/${recepientId}`);
          if (response.error) {
            setError(response.error);
            return;
          }
          setRecipientUser(response);
        } catch (error) {
          setError("An error occurred while fetching user data");
        }
      };

      fetchData();
    }
  }, [chat, user]);

  return { recipientUser, error };
};
