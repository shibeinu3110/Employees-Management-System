import Mock from "../mock";
import shortId from "shortid";
import ConstantList from "../../app/appConfig";
const NotificationDB = {
  list: [
    {
      id: shortId.generate(),
      heading: "Message",
      icon: {
        name: "chat",
        color: "primary"
      },
      timestamp: 1570702802573,
      title: "New message from Devid",
      subtitle: "Hello, Let's chit chat...",
      path: "chat"
    },
    {
      id: shortId.generate(),
      heading: "Alert",
      icon: {
        name: "notifications",
        color: "error"
      },
      timestamp: 1570702702573,
      title: "Server overloaded",
      subtitle: "Traffice reached 2M",
      path: "page-layouts/user-profile"
    },
    {
      id: shortId.generate(),
      heading: "Message",
      icon: {
        name: "chat",
        color: "primary"
      },
      timestamp: 1570502502573,
      title: "New message from Goustove",
      subtitle: "Hello, Let's chit chat...",
      path: "chat"
    }
  ]
};

Mock.onGet(ConstantList.ROOT_PATH+"api/notification").reply(config => {
  const response = NotificationDB.list;
  return [200, response];
});

Mock.onPost(ConstantList.ROOT_PATH+"api/notification/add").reply(config => {
  const response = NotificationDB.list;
  return [200, response];
});

Mock.onPost(ConstantList.ROOT_PATH+"api/notification/delete").reply(config => {
  let { id } = JSON.parse(config.data);
  // console.log(id);

  const response = NotificationDB.list.filter(
    notification => notification.id !== id
  );
  NotificationDB.list = [...response];
  return [200, response];
});

Mock.onPost(ConstantList.ROOT_PATH+"api/notification/delete-all").reply(config => {
  NotificationDB.list = [];
  const response = NotificationDB.list;
  return [200, response];
});
