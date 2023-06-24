package org.eclipse.jetty.demo;

import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.WebSocketAdapter;

import java.io.IOException;
import java.sql.SQLException;

public class EventSocket extends WebSocketAdapter {
	
	SQLiteJDBC sqljd = new SQLiteJDBC();
	String ID_VAL = "none";
	
    @Override
    public void onWebSocketConnect(Session sess) {
        super.onWebSocketConnect(sess);
        System.out.println("Socket Connected: " + sess);
        
        ID_VAL = ChatRoom.getInstance().join(this);
    }
    
    @Override
    public void onWebSocketText(String message)
    {
        super.onWebSocketText(message);
        System.out.println("Received TEXT message: " + message);
	    try {
            //this.getRemote().sendString(message);
		    //System.out.println("Sent TEXT message: " + message);
	    	 // Handle new messages
	    	System.out.println(message);
	    	//session.getBasicRemote().sendText("YOOO I GOT A TEXT");
	    	
	    	String[] splitStr = message.split("\\s+");
	    	
	    	int pin = Integer.parseInt(splitStr[0]);
	    	
	    	String moveVal = splitStr[1];
	    	
	    	//System.out.println("got here");
	    	
	    	if (pin == 0) {
	    		pin = sqljd.returnPIN();
	    		System.out.println("NEW PIN: " + pin);
	    		this.getRemote().sendString("PIN: " + pin);
	    	}
	    	
	    	String res = sqljd.getVals(pin, ID_VAL);
	    	System.out.println("RES: " + res);
	    	
	    	if (res == "not found"){
	    		sqljd.insert(pin, ID_VAL);
	    	} else if (res == "none"){
	    		sqljd.updatePlayers(pin, ID_VAL);
	    	} else {
	    		String oppoID = res;
	    		ChatRoom.getInstance().writeSpecificMember(oppoID, moveVal);
	    		//sendMove(this, oppoID, moveVal);
	    	}

	    } catch (IOException | SQLException | ClassNotFoundException e) {
		    System.out.println("Websocket IO error: " + e.getMessage());
	    }
    }
    
    @Override
    public void onWebSocketClose(int statusCode, String reason)
    {
        super.onWebSocketClose(statusCode,reason);
        System.out.println("Socket Closed: [" + statusCode + "] " + reason);
        ChatRoom.getInstance().part(this);
    }
    
    @Override
    public void onWebSocketError(Throwable cause)
    {
        super.onWebSocketError(cause);
        cause.printStackTrace(System.err);
        ChatRoom.getInstance().part(this);
    }
}
