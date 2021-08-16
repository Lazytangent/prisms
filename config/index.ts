export const port = process.env.PORT || 5000;
export const environment = process.env.NODE_ENV || 'development';
export const secret = process.env.SECRET || 'some secret';
export const maxAge = +(process.env.MAX_AGE || 604800);
