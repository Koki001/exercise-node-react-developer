import { Router, Request, Response } from 'express';
import fileJSON from '../../data/repos.json';
import axios from 'axios';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!

  const responseData = await axios.get(
    'https://api.github.com/users/silverorange/repos'
  );

  const joinedData = fileJSON.concat(responseData.data);
  const finalData = joinedData.filter((obj) => {
    return obj.fork === false;
  });

  res.setHeader('content-type', 'application/json');
  res.json(finalData);
});