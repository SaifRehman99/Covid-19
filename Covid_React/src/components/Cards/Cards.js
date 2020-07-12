import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import Spinner from './giphy.gif';
import CountUp from 'react-countup';
import cs from 'classnames';

import style from './Cards.module.css';

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  return (
    <div className={style.container}>
      {confirmed === undefined ? (
        <img
          src={Spinner}
          style={{
            height: '180px',
          }}
          alt='loading'
        />
      ) : (
        <Grid container spacing={3} justify='center'>
          <Grid
            item
            component={Card}
            xs={12}
            md={3}
            className={cs(style.card, style.infected)}>
            <CardContent>
              <Typography color='textSecondary' gutterBottom>
                Infected
              </Typography>
              <Typography variant='h5' gutterBottom>
                <CountUp
                  start={0}
                  end={confirmed.value}
                  duration={2}
                  separator=','
                />
              </Typography>
              <Typography color='textSecondary'>
                {new Date(lastUpdate).toDateString()}
              </Typography>
              <Typography variant='body2'>
                No of active cases of COVID-19
              </Typography>
            </CardContent>
          </Grid>
          <Grid
            item
            component={Card}
            xs={12}
            md={3}
            className={cs(style.card, style.recovered)}>
            <CardContent>
              <Typography color='textSecondary' gutterBottom>
                Recovered
              </Typography>
              <Typography variant='h5' gutterBottom>
                <CountUp
                  start={0}
                  end={recovered.value}
                  duration={2}
                  separator=','
                />
              </Typography>
              <Typography color='textSecondary'>
                {new Date(lastUpdate).toDateString()}
              </Typography>
              <Typography variant='body2'>
                No of recoveries from COVID-19
              </Typography>
            </CardContent>
          </Grid>
          <Grid
            item
            component={Card}
            xs={12}
            md={3}
            className={cs(style.card, style.deaths)}>
            <CardContent>
              <Typography color='textSecondary' gutterBottom>
                Deaths
              </Typography>
              <Typography variant='h5' gutterBottom>
                <CountUp
                  start={0}
                  end={deaths.value}
                  duration={2}
                  separator=','
                />
              </Typography>
              <Typography color='textSecondary'>
                {new Date(lastUpdate).toDateString()}
              </Typography>
              <Typography variant='body2'>
                No of death cause by COVID-19
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Cards;
