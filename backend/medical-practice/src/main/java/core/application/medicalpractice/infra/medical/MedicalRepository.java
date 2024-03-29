package core.application.medicalpractice.infra.medical;

import java.sql.*;
import java.util.UUID;

import core.application.DButils.DBUtil;
import core.application.medicalpractice.domain.entity.*;

public class MedicalRepository {

  public void saveConsultation(Consultation consultation) throws SQLException {
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "INSERT INTO Consultations(consultationid, patientid, date, beginconsultation, endconsultation, doctorid) VALUES ("
        + "'" + consultation.getId() + "'" + "," + "'" + consultation.getPatient().getId() + "'" + ","
        + new java.sql.Date(consultation.getAppointment().getTimeSlot().getBeginDate().getTime()) + ","
        + new java.sql.Timestamp(consultation.getAppointment().getTimeSlot().getBeginDate().getTime()) + ","
        + new java.sql.Timestamp(consultation.getAppointment().getTimeSlot().getEndDate().getTime()) + "," + "'"
        + consultation.getDoctor().getId() + "'" + ")";
    stmt.executeUpdate(request);
    stmt.close();
    DBUtil.closeConnection(connection);
  }

  public Boolean checkMedicalFileExist(Patient patient, UUID doctorId) throws SQLException{
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "SELECT * FROM medicalfile where patientid = '" + patient.getId() + "' and doctorid = '" + doctorId + "'";
    ResultSet rs = stmt.executeQuery(request);
    Boolean exist = rs.next();
    rs.close();
    stmt.close();
    DBUtil.closeConnection(connection);
    return exist;
  }

  public void createMedicalFile(UUID patientId, UUID doctorId) throws SQLException{
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "INSERT INTO MedicalFile(doctorId, patientId,consultationId) VALUES ('"
        + doctorId + "','" + patientId + "', '{}')";
    stmt.executeUpdate(request);
    stmt.close();
    DBUtil.closeConnection(connection);
  }

  public void addConsultationToMedicalFile(UUID patientId, UUID doctorId, UUID consultationId) throws SQLException{
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "UPDATE MedicalFile SET consultationid = array_append(consultationid,'" + consultationId +
        "') where patientid = '" + patientId + "' and doctorid = '" + doctorId + "'";
    stmt.executeUpdate(request);
    stmt.close();
    DBUtil.closeConnection(connection);
  }

  public Date getAppointmentDateById(Appointment appointment) throws SQLException {
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "SELECT starttime FROM appointments where appointmentid = '" + appointment.getId() + "'";
    ResultSet rs = stmt.executeQuery(request);
    Date date = null;
    if (rs.next()){
      date = rs.getDate(1);
    }
    rs.close();
    stmt.close();
    DBUtil.closeConnection(connection);
    return date;
  }
  

}