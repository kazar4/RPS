package org.eclipse.jetty.demo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;
import java.util.UUID;

public class ChatRoom {
    private static final ChatRoom INSTANCE = new ChatRoom();

    public static ChatRoom getInstance()
    {
        return INSTANCE;
    }

    private HashMap<String, EventSocket> members = new HashMap<>();

    public String join(EventSocket socket) 
    {
    	String uniqueID = UUID.randomUUID().toString();
    	members.put(uniqueID, socket);
    	return uniqueID;
        //members.add(socket);
    }

    public void part(EventSocket socket) 
    {
    	System.out.println("BEFORE: " + members.size());
        members.remove(findNameBySocket(socket));
        System.out.println("AFTER: " + members.size());
    }

    public void writeAllMembers(String message) {
        for(Entry<String, EventSocket> mapElement : members.entrySet())
        {
            mapElement.getValue().getSession().getRemote().sendStringByFuture(message);
        }
    }

    public void writeSpecificMember(String memberName, String message) {
    	EventSocket member = findMemberByName(memberName);
        member.getSession().getRemote().sendStringByFuture(message);
    }

    public EventSocket findMemberByName(String memberName) {
    	for(Entry<String, EventSocket> mapElement : members.entrySet()) {
    		if (mapElement.getKey().equalsIgnoreCase(memberName)) {
    			return mapElement.getValue();
    			}
        }
		return null;
    }
    
    public String findNameBySocket(EventSocket es) {
    	for(Entry<String, EventSocket> mapElement : members.entrySet()) {
    		if (mapElement.getValue() == es) {
    			return mapElement.getKey();
    			}
        }
		return null;
    }
}