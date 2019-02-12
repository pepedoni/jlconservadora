export const upperCaseFirst = (text: string) : string => {
  let words = text.split(' ');
  words = words.map(word => word.charAt(0) + word.slice(1).toLowerCase());
  return words.join(' ');
}

export const validateMail = (mail: string) : boolean => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(mail).toLowerCase());
}