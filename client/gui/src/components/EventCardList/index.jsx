import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventCard from './EventCard';
import {Skeleton} from 'antd';
import './styles.css'

class EventCardList extends Component {
  render() {
    const { events, loading } = this.props;
    return (
      <section>
        {events.map((event) => (
          <EventCard 
            key={event.pk}
            id={event.pk}
            title={event.title}
            type={event.type}
            start_date={event.start_date}
            end_date={event.end_date}
            inscriptions={event.inscriptions}
            max_inscriptions={event.max_inscriptions}
          />
          ))}
        <Skeleton className="EventCard_wrp" loading={loading} active title/>
        <Skeleton className="EventCard_wrp" loading={loading} active title/>
        <Skeleton className="EventCard_wrp" loading={loading} active title/>
        <Skeleton className="EventCard_wrp" loading={loading} active title/>
        <Skeleton className="EventCard_wrp" loading={loading} active title/>
      </section> 
    );
  }
}


EventCardList.propTypes = {
  
};


export default EventCardList;
