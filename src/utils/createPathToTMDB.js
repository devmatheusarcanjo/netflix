
export const pathImage = ({filePath, size}) => {
    
    if(size) {
        return `https://image.tmdb.org/t/p/w${size}/${filePath}`
    } else {
        return `https://image.tmdb.org/t/p/original/${filePath}`
    }
    
}


/*
https://image.tmdb.org/t/p/original/2KGxQFV9Wp1MshPBf8BuqWUgVAz.jpg
*/


export const pathVideo = ({filePath}) => {
    return undefined;
}