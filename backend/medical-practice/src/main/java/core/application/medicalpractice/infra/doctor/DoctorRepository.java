package core.application.medicalpractice.infra.doctor;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import core.application.medicalpractice.domain.entity.Doctor;

@Repository
public interface DoctorRepository{

    public List<Doctor> getAllDoctors();
    public List<String> getAllSpecialities();
    public Doctor getDoctorById(UUID doctorid);
    public List<Doctor> getDoctorsBySpeciality(String speciality);
    public List<List<String>>  displayAppointments(String firstName, String lastName) throws SQLException;
    public List<List<String>> getAllAppointmentsDoctor(String mail) throws SQLException;
    public List<List<String>> getPatientsByDoctor(String mail) throws SQLException;
    public UUID getDoctorIdByMail(String mail) throws SQLException;
    public void addConsultation(String mail, String lastname, String firstname, Date date, String motif, List<String> medicList) throws SQLException;
    public UUID addPrescription(List<String> medicList) throws SQLException;
}
