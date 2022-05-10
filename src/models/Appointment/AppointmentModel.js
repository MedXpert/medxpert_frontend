export class AppointmentModel {
  constructor(
    id,
    userId,
    healthCareFacilityId,
    healthCareFacilityType,
    dateTime,
    status,
    reminderStatus,
  ) {
    this.id = id;
    this.userId = userId;
    this.healthCareFacilityId = healthCareFacilityId;
    this.healthCareFacilityType = healthCareFacilityType;
    this.dateTime = dateTime;
    this.status = status;
    this.reminderStatus = reminderStatus;
  }

  getAppointment() {
    return {
      id: this.id,
      userId: this.userId,
      healthCareFacilityId: this.healthCareFacilityId,
      healthCareFacilityType: this.healthCareFacilityType,
      dateTime: this.dateTime,
      status: this.status,
      reminderStatus: this.reminderStatus,
    };
  }
}
