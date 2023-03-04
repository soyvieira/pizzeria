import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';

interface Payload{
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
){
  
  //Getting token
  const authToken = req.headers.authorization;

  //if token doesn't exist
  if(!authToken){
    return res.status(401).end();
  }

  //Getting just the token
  const [, token] = authToken.split(" "); //Getting just the token

  try{
    //token validation
    const{ sub } = verify(
      token,
      process.env.JWT_SECRET
    ) as Payload;
    
    //To get the token ID and put in user_id variable, in req
    req.user_id = sub;

    return next();

  }catch(err){
    return res.status(401).end();
  }

}