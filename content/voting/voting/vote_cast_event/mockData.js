let data = {};

export const mock = (newData) => {
  data = {
    ...data,
    ...newData,
  }
}
  
export const getData = () => data;