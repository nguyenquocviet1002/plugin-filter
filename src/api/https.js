const url = 'https://scigroup.com.vn/ky-luat-lao-dong/wp-content/themes/SCI_Theme/Module/assets/js/bo-ky-luat';

export const getList = async() => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}