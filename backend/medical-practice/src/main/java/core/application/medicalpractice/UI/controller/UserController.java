package core.application.medicalpractice.UI.controller;

import java.sql.SQLException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.Random;


import core.application.medicalpractice.application.MedicalPractice;

@RestController
public class UserController {

    @Autowired
	private MedicalPractice medicalPractice;

    @Autowired
    private JWTToken jwtToken;

    @Autowired
    private JavaMailSender javaMailSender;

    @PostMapping(value = "/login")
	public ResponseEntity<?>  checkLogin(@RequestBody Map<String, String> map) throws SQLException {
        String email = map.get("login");
        String password = map.get("password");
        if (medicalPractice.checkLoginExist(email, password)){
            String token = jwtToken.createToken(email);
            return ResponseEntity.ok(token);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}

    @PostMapping(value = "/new-password")
    public ResponseEntity<?>  resetPassword(@RequestBody Map<String, String> map) throws SQLException {
        String mail = map.get("mail");
        if (medicalPractice.checkUserExist(mail)){

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(mail);

            String subject = "Rénitialisation de votre mot de passe";
            message.setSubject(subject);

            String chars = "abcdefghijklmnopqrstuvwxyz"
            + "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            + "0123456789"
            + "!@#$%^&*()_+";

            StringBuilder sb = new StringBuilder();
            Random random = new Random();
            for (int i = 0; i < 12; i++) {
                int index = random.nextInt(chars.length());
                sb.append(chars.charAt(index));
            }

            String newPassword = sb.toString();
            String body = "Voici votre mot de passe provisoire pour pouvoir vous connecter. N'hésitez pas à le changer une fois connecté depuis votre compte"
                           + "\n Nouveau mot de passe : "+ newPassword;
            message.setText(body);
            javaMailSender.send(message);

            medicalPractice.resetPassword(mail, newPassword);

            return ResponseEntity.ok("Le mot de passe a été réinitialisé et un nouveau a été renvoyé par mail");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("L'adresse email fournie n'existe pas.");
	}
    
    
}