export const removeAccented = text => {
    if(typeof text !== 'string'){
      text = '';
    }
    text = text.toLowerCase();
    text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, 'd').replace(/Đ/g, 'D');
    return text;
};

export const removeDuplicate = (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

export const shuffle = (arra1) => {
  let ctr = arra1.length, temp, index;

// While there are elements in the array
  while (ctr > 0) {
// Pick a random index
    index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
    ctr--;
// And swap the last element with it
    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1;
}