const webpush = require('web-push');
export class Notification {
  private vapidKeys = {
    "publicKey": "BIwtoJvtUF4V1uOzH1yejfJwGkoFZmNPP1x7bJp3M3BNRaPoGDNQxbYevVomi_XuYPcVFxLN193gp_fCxgPuL6g",
    "privateKey": "hUN6JQDc2LPFyud3R9jsDJ8Vom7J_4P_gw2e19EsU7Y"
  };
  private allSubscriptions: any[] = [];

  constructor(private app: any) {
    webpush.setVapidDetails(
      'mailto:example@yourdomain.org',
      this.vapidKeys.publicKey,
      this.vapidKeys.privateKey
    );
    this.app.route('/api/newsletter').post(this.sendNewsletter);
  }



  private registerSubscriber = (req: any, res: any) => {
    this.allSubscriptions.push(req.body.sub);
  }

  public sendNewsletter = (req: any, res: any) => {
    this.allSubscriptions.push(req.body.sub);
    const notificationPayload = {
      "notification": {
        "title": "Bingo",
        "body": "Bingo JHustle!",
        "icon": "assets/icon-512x512.png",
        "vibrate": [100, 50, 100],
        "data": {
          "dateOfArrival": Date.now(),
          "primaryKey": 1
        },
        "actions": [{
          "action": "explore",
          "title": "Go to the site"
        }]
      }
    };

    Promise.all(this.allSubscriptions.map(sub => webpush.sendNotification(
      sub, JSON.stringify(notificationPayload))))
      .then(() => res.status(200).json({ message: 'Newsletter sent successfully.' }))
      .catch(err => {
        console.error("Error sending notification, reason: ", err);
        res.sendStatus(500);
      });
  }
  public sendNotification(title: string, message: string){
    const notificationPayload = {
      "notification": {
        "title": title,
        "body": message,
        "icon": "assets/icon-512x512.png",
        "vibrate": [100, 50, 100],
        "data": {
          "dateOfArrival": Date.now(),
          "primaryKey": 1
        },
        "actions": [{
          "action": "blub",
          "title": "Look the blub"
        }]
      }
    };
    Promise.all(this.allSubscriptions.map(sub => webpush.sendNotification(
      sub, JSON.stringify(notificationPayload))))
  }
}