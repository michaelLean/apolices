export default interface Policy {
  id?: string;
  policyNumber: string;
  lifeTimeStart: Date;
  lifeTimeEnd: Date;
  vehicle: string;
  value: number;
}
