package core.application.DButils;

import java.sql.*;

public class DBUtil {

    private static Connection connection = null;

    public static Connection getConnection() throws SQLException{
        if(connection != null){
            return connection;
        }else{

            String driver = "org.postgresql.Driver";
            String url = "jdbc:postgresql://postgresql-medical-practice.alwaysdata.net:5432/medical-practice_folders";
            String user = "medical-practice";
            String password = "8kPmx2.!XnW97pF";

            try {
                Class.forName(driver);
                connection = DriverManager.getConnection(url, user, password);
            } catch (ClassNotFoundException e) {
                
                e.printStackTrace();
            }
            
        }
        
        return connection;
    }
    
}