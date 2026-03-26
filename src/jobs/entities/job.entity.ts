import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from 'src/users/entities/user.entity';

export enum JobStatus {
  SEARCHING = 'searching',
  NEGOTIATING = 'negotiating',
  ACCEPTED = 'accepted',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

@Entity('jobs')
export class Job extends BaseEntity {
  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: JobStatus, default: JobStatus.SEARCHING })
  status: JobStatus;

  @Column({ type: 'geography', spatialFeatureType: 'Point', srid: 4326 })
  location: {
    type: 'Point';
    coordinates: [number, number];
  };

  @ManyToOne(() => User, (user) => user.requestedJobs, { nullable: false })
  client: User;

  @ManyToOne(() => User, (user) => user.acceptedJobs, { nullable: true })
  professional: User;
}
