export class MailService {

  static hostUrl = 'http://localhost:3000';

  static getMessages(mailbox) {
    const url = `${this.hostUrl}/${mailbox}`;
    return fetch(url)
      .then(response => response.json())
      .catch(this.handleError);
  }

  static getMessage(mailbox, id) {
    const url = `${this.hostUrl}/${mailbox}`;
    return fetch(url)
      .then(response => response.json())
      .then(response => response.find(message => message.id === id))
      .catch(this.handleError);
  }

  static deleteMessage(mailbox, id) {
    const url = `${this.hostUrl}/${mailbox}/${id}`;
    const options = {method: 'DELETE'};
    return fetch(url, options).catch(this.handleError);
  }

  static sendMessage(message) {
    const url = `${this.hostUrl}/outbox`;
    message.dateSent = this.getDateSent();
    const options = {method: 'POST', body: JSON.stringify(message)};

    return fetch(url, options)
      .then(response => response.json())
      .catch(this.handleError);
  }

  static zeroPad(value) {
    return value > 9 ?  '' + value : '0' + value;
  }

  static getDateSent(date = new Date()) {
    const day = this.zeroPad(date.getDate());
    const month = this.zeroPad(date.getMonth() + 1);
    const year = date.getFullYear();

    return `${year}.${month}.${day}`;
  }

  static handleError(error) {
    // eslint-disable-next-line
    console.error(error);
  }
}
