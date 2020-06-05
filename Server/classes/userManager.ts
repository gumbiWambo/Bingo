import { Application } from "express";
const crypto = require('crypto');
export class UserManager{
  private registeredUsers = [];
  constructor(private app: Application) {
    this.initRoutes();
  }
  private initRoutes() {
    this.app.post('/api/usermanagement/register', (req, res) => {
      if(!!req.body && !!req.body.username && !!req.body.password && !!req.body.email) {
        const salt = this.createSalt();
        const passwordHash = this.hash(req.body.password + salt);
        this.insertUser(req.body.username, passwordHash, req.body.email, salt);
        res.send({ok: true});
      } else {
        res.sendStatus(400);
      }
    });
    this.app.post('/api/usermanagement/login', (req, res) => {
      if(!!req.body && !!req.body.username && !!req.body.password) {
        const user = this.registeredUsers.find(x => x.username === req.body.username);
        if(user) {
          if(user.password === this.hash(req.body.password + user.salt)) {
            console.log('Verified!')
            res.send({username: user.username});
          } else {
            res.sendStatus(401);
          }
        } else {
          res.sendStatus(401);
        }
      } else {
        res.sendStatus(400);
      }
    });
  }
  private createSalt(): string {
    return 'xxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  private hash(information: string): string {
    return crypto.createHash('sha256').update(information).digest('hex');
  }
  private insertUser(username, password, email, salt) {
    this.registeredUsers.push({username, password, email, salt});
    console.log(username, email, password, salt);
  }
}