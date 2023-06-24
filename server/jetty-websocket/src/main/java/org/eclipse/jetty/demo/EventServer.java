package org.eclipse.jetty.demo;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.eclipse.jetty.http.HttpVersion;
import org.eclipse.jetty.server.*;
import org.eclipse.jetty.server.handler.ContextHandler;
import org.eclipse.jetty.server.handler.HandlerCollection;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.util.ssl.SslContextFactory;
import org.eclipse.jetty.websocket.server.WebSocketHandler;
import org.eclipse.jetty.websocket.servlet.WebSocketServletFactory;

public class EventServer {
  public static void main(String[] args) {
    ///////////////////////////////////////////////////
    // This part configures the server for http on 'port' and https on 'sslPort'
    final int port = 5080;
    final int sslPort = 8502;
    final Server server = new Server(port);

    SslContextFactory contextFactory = new SslContextFactory();
    contextFactory.setKeyStorePath("/ssl/keystore");
    contextFactory.setKeyStorePassword("password");
    SslConnectionFactory sslConnectionFactory = new SslConnectionFactory(contextFactory, org.eclipse.jetty.http.HttpVersion.HTTP_1_1.toString());

    HttpConfiguration config = new HttpConfiguration();
    config.setSecureScheme("https");
    config.setSecurePort(sslPort);
    config.setOutputBufferSize(32786);
    config.setRequestHeaderSize(8192);
    config.setResponseHeaderSize(8192);
    HttpConfiguration sslConfiguration = new HttpConfiguration(config);
    sslConfiguration.addCustomizer(new SecureRequestCustomizer());
    HttpConnectionFactory httpConnectionFactory = new HttpConnectionFactory(sslConfiguration);

    ServerConnector connector = new ServerConnector(server, sslConnectionFactory, httpConnectionFactory);
    connector.setPort(sslPort);
    server.addConnector(connector);

    ///////////////////////////////////////////////////
    // This part configures the context handlers for HTTP and WebSocket

    // HTTP Context
    ContextHandler httpContext = new ContextHandler();
    httpContext.setContextPath("/hello");
    httpContext.setResourceBase(".");
    httpContext.setClassLoader(Thread.currentThread().getContextClassLoader());

    httpContext.setHandler(new HelloHandler());

    // WebSocket Context
    ServletContextHandler wsContext = new ServletContextHandler(ServletContextHandler.SESSIONS);
    wsContext.setContextPath("/");
    httpContext.setResourceBase(".");
    httpContext.setClassLoader(Thread.currentThread().getContextClassLoader());
    // Add a websocket to a specific path spec
    ServletHolder holderEvents = new ServletHolder("ws-events", EventServlet.class);
    wsContext.addServlet(holderEvents, "/web");

    // Add both context handlers to the server
    HandlerCollection handlerCollection = new HandlerCollection();
    handlerCollection.setHandlers(new Handler[]{httpContext, wsContext});
    server.setHandler(handlerCollection);

    // Clears database
    new SQLiteJDBC().deleteAll();
    System.out.println("Initial Delete Done");

    try {
      (new Thread() {
        public void run() {

          Date pastDate = new Date();
          int month = pastDate.getDay();
          int year = pastDate.getYear();

          while (true) {
            try {
              if (new SimpleDateFormat("MM/yyyy").parse(month + "/" + year).after(new Date())) {
                pastDate = new Date();
                month = pastDate.getDay();
                year = pastDate.getYear();

                SQLiteJDBC sqljd = new SQLiteJDBC();

                sqljd.deleteAll();
                System.out.println("Daily Delete Done");

              }
            } catch (ParseException e) {
              // TODO Auto-generated catch block
              e.printStackTrace();
            }
          }
        }
      }).start();

      server.start();
      //server.dump(System.err);
      server.join();
    } catch (Throwable t) {
      t.printStackTrace(System.err);
    }
  }
}
