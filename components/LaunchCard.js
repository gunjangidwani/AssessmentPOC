import styled from 'styled-components';
import Image from 'next/image';

const LaunchCard = ({ launch }) => (
  <Card>
    <div key={launch.launch_date_unix}>
      <div>
        <Image
          src={launch.links.mission_patch}
          alt={`${launch.mission_name} icon`}
          width={200}
          height={200}
          quality={60}
        />
      </div>
      <div className="card-title">
        {launch.mission_name} #{launch.flight_number}
      </div>
      {launch.mission_id.length > 0 && (
        <div className="mission-id">
          Mission IDs:{' '}
          {launch.mission_id.map(id => (
            <span key={id}>{id}</span>
          ))}
        </div>
      )}
      <div>
        Launch year:
        {launch.launch_year}
      </div>
      <div>
        Succesfull Launch:
        {`${launch.launch_success}`}
      </div>
    </div>
  </Card>
);

const Card = styled.div`
  margin: auto;
  margin-bottom: 25px;
  width: 100%;
  max-width: 200px;
  .card-title {
    font-weight: 600;
    color: indigo;
  }
  img {
    max-width: 100%;
    height: auto;
  }
`;

export default LaunchCard;
