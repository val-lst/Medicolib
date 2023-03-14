package core.application.medicalpractice.infra;

import java.util.List;

import org.springframework.stereotype.Repository;

import core.application.medicalpractice.domain.entity.Doctor;
import core.application.medicalpractice.domain.valueObjects.Appointment;

@Repository
public interface DoctorRepository{

    public List<Doctor> getAllDoctors();
    public List<String> getAllSpecialities();
    public List<Doctor> getDoctorsBySpeciality(String speciality);
    public List<Appointment> getAppointmentsByDoctors(Doctor doctor);
}
