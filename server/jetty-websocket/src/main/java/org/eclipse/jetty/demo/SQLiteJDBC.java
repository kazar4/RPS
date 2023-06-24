package org.eclipse.jetty.demo;

import java.sql.*;
import java.util.ArrayList;
import java.util.Random;

public class SQLiteJDBC {

  /**
   * public static void main( String args[] ) throws ClassNotFoundException, SQLException {
   * <p>
   * SQLiteJDBC sq = new SQLiteJDBC();
   * <p>
   * System.out.println(sq.getVals(12345, "yeet"));
   * //insert(12345, "12345");
   * sq.insert(12345, "yoinks");
   * //sq.insert(12345, "yoinks");
   * sq.updatePlayers(12345, "yeet");
   * <p>
   * System.out.println(sq.returnPIN());
   * }
   **/

  private static Connection connect() {
    // SQLite connection string
    //String url = "jdbc:sqlite:C://sqlite/test.db";
    Connection conn = null;
    try {
      conn = DriverManager.getConnection("jdbc:sqlite:test.db");
    } catch (SQLException e) {
      System.out.println(e.getMessage());
    }
    return conn;
  }

  public void insert(int pin, String P1_ID) throws ClassNotFoundException {

    try {
      Connection conn = connect();
      System.out.println("Opened database successfully");

      String sql = "INSERT INTO GAME_DATA(GAME_PIN, ID_1, ID_2, PLAYERS) VALUES(?,?,?,?)";

      PreparedStatement pstmt = conn.prepareStatement(sql);
      pstmt.setInt(1, pin);
      pstmt.setString(2, P1_ID);
      pstmt.setString(3, "none");
      pstmt.setInt(4, 1);

      pstmt.executeUpdate();

      conn.close();
    } catch (SQLException e) {
      System.out.println(e.getMessage());
    }
  }

  public String getVals(int pinMatch, String P_ID) throws SQLException {

    int count = 0;

    Connection conn = connect();
    try {
      System.out.println("Opened database successfully");

      PreparedStatement stmt = conn.prepareStatement("SELECT * FROM GAME_DATA WHERE GAME_PIN = ?;");
      //AND (ID_1 = ? OR ID_2 = ?);
      stmt.setInt(1, pinMatch);
      //stmt.setString(2, P_ID);
      //stmt.setString(3, P_ID);


      //stmt = c.createStatement();
      ResultSet rs = stmt.executeQuery();

      while (rs.next()) {

        count++;

        /**
         int pin = rs.getInt("GAME_PIN");
         String id = rs.getString("ID");
         int players  = rs.getInt("PLAYERS");

         System.out.println( "PIN = " + pin);
         System.out.println( "ID = " + id);
         System.out.println( "Players = " + players);
         System.out.println();
         **/

        String p1_id = rs.getString("ID_1");
        String p2_id = rs.getString("ID_2");

        rs.close();
        stmt.close();
        conn.close();

        /**
         if (p1_id == P_ID) {
         return p2_id;
         } else if (p2_id == P_ID){
         return p1_id;
         } else {
         return "not found";
         }
         **/

        System.out.println(P_ID);
        System.out.println(p1_id);
        System.out.println(p2_id);

        System.out.println(String.valueOf(P_ID == p2_id));

        if (P_ID.equalsIgnoreCase(p1_id)) {
          return p2_id;
        } else if (P_ID.equalsIgnoreCase(p2_id)) {
          System.out.println("why no here");
          return p1_id;
        } else {
          return "none";
        }

      }

    } catch (Exception e) {
      System.err.println(e.getClass().getName() + ": " + e.getMessage());
      System.exit(0);
      return "error";
    }
    System.out.println("Operation done successfully");

    conn.close();
    System.out.println(count);
    if (count == 0) {
      return "not found";
    } else {
      return "none";
    }
  }

  public void updatePlayers(int pinMatch, String P2_ID) throws SQLException {

    try {
      Connection conn = connect();
      System.out.println("Opened database successfully");

      PreparedStatement stmt = conn.prepareStatement("UPDATE GAME_DATA set PLAYERS = 2 where GAME_PIN = ? AND PLAYERS = 1;");
      stmt.setInt(1, pinMatch);
      //stmt = c.createStatement();
      stmt.executeUpdate();

      PreparedStatement stmt2 = conn.prepareStatement("UPDATE GAME_DATA set ID_2 = ? where GAME_PIN = ? AND PLAYERS = 2;");
      stmt2.setString(1, P2_ID);
      stmt2.setInt(2, pinMatch);
      //stmt = c.createStatement();
      stmt2.executeUpdate();

      /**
       stmt = c.createStatement();
       String sql = "UPDATE COMPANY set SALARY = 25000.00 where ID=1;";
       stmt.executeUpdate(sql);
       c.commit();
       **/

      /**
       ResultSet rs = stmt.executeQuery("SELECT * FROM GAME_DATA");

       while ( rs.next() ) {
       int pin = rs.getInt("GAME_PIN");
       String id = rs.getString("ID");
       int players  = rs.getInt("PLAYERS");

       System.out.println( "PIN = " + pin );
       System.out.println( "ID = " + id );
       System.out.println( "Players = " + players );
       System.out.println();
       }
       **/
      //rs.close();
      stmt.close();
      conn.close();

    } catch (Exception e) {
      System.err.println(e.getClass().getName() + ": " + e.getMessage());
      System.exit(0);
    }
    System.out.println("Operation done successfully");
  }

  public int returnPIN() {
    ArrayList<Integer> lst = new ArrayList<Integer>();

    Connection conn = connect();
    try {
      System.out.println("Opened database successfully");

      PreparedStatement stmt = conn.prepareStatement("SELECT * FROM GAME_DATA");
      //AND (ID_1 = ? OR ID_2 = ?);
      //stmt.setString(2, P_ID);
      //stmt.setString(3, P_ID);


      //stmt = c.createStatement();
      ResultSet rs = stmt.executeQuery();

      while (rs.next()) {

        int pin = rs.getInt("GAME_PIN");

        lst.add(pin);

        /**
         String id = rs.getString("ID");
         int players  = rs.getInt("PLAYERS");

         System.out.println( "PIN = " + pin);
         System.out.println( "ID = " + id);
         System.out.println( "Players = " + players);
         System.out.println();
         **/

        rs.close();
        stmt.close();
        conn.close();

        /**
         if (p1_id == P_ID) {
         return p2_id;
         } else if (p2_id == P_ID){
         return p1_id;
         } else {
         return "not found";
         }
         **/


      }

    } catch (Exception e) {
      System.err.println(e.getClass().getName() + ": " + e.getMessage());
      System.exit(0);
      return 0;
    }
    System.out.println("Operation done successfully");

    Random rand = new Random();

    while (true) {
      int newPin = 100 + (100 * rand.nextInt(8)) + (10 * rand.nextInt(9)) + (1 * rand.nextInt(9));
      if (!lst.contains(newPin)) {
        return newPin;
      }
    }

  }


  public void deleteAll() {

    Statement stmt = null;

    Connection conn = connect();

    try {
      Class.forName("org.sqlite.JDBC");
      conn = DriverManager.getConnection("jdbc:sqlite:test.db");
      conn.setAutoCommit(false);
      System.out.println("Opened database successfully");

      stmt = conn.createStatement();
      String sql = "DELETE from GAME_DATA";
      stmt.executeUpdate(sql);
      conn.commit();

      stmt.close();
      conn.close();
    } catch (Exception e) {
      System.err.println(e.getClass().getName() + ": " + e.getMessage());
      System.exit(0);
    }
    System.out.println("Operation done successfully");
  }

}
//IF PIN EXISTS RETURN THE SESSION ID

//IF PIN EXISTS AND HAS AN ID ADD TWO


// GOAL GIVEN A PIN and a MOVE -> GIVE BACK THE OPONENT MOVE

// PLAYER 1 CONNECTS -> INSERT NEW ROW WITH DATA
// -> WAITS UNTIL BOOLEAN TO UPDATE PLAYERS = 2 GOES THROUGH
// ADD IT SO NOW BOTH SESSIONS ID's ARE FILLED
// WHEN PLAYERS = 2 =>
// RUN FUNCTION WHERE YOU GIVE PIN AND ID
// AND THEN IT WILL RETURN OTHER ID TO SEND TO
// THEN YOU CAN SEND DATA
