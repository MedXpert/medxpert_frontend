export class AppointmentModel {
  constructor(
    id,
    userId,
    healthCareFacilityId,
    healthCareFacilityType,
    dateTime,
    status,
  ) {
    this.id = id;
    this.userId = userId;
    this.healthCareFacilityId = healthCareFacilityId;
    this.healthCareFacilityType = healthCareFacilityType;
    this.dateTime = dateTime;
    this.status = status;
  }

  getAppointment() {
    return {
      id: this.id,
      userId: this.userId,
      healthCareFacilityId: this.healthCareFacilityId,
      healthCareFacilityType: this.healthCareFacilityType,
      dateTime: this.dateTime,
      status: this.status,
    };
  }
}
