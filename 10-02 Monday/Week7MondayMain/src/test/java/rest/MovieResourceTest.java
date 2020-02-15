package rest;

import entities.Movie;
import utils.EMF_Creator;
import io.restassured.RestAssured;
import static io.restassured.RestAssured.given;
import io.restassured.parsing.Parser;
import java.net.URI;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.ws.rs.core.UriBuilder;
import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.grizzly.http.util.HttpStatus;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.hasProperty;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import utils.EMF_Creator.DbSelector;
import utils.EMF_Creator.Strategy;

public class MovieResourceTest {

    private static final int SERVER_PORT = 7777;
    private static final String SERVER_URL = "http://localhost/api";

    static final URI BASE_URI = UriBuilder.fromUri(SERVER_URL).port(SERVER_PORT).build();
    private static HttpServer httpServer;
    private static EntityManagerFactory emf;
    private static Movie m1, m2, m3, m4;

    static HttpServer startServer() {
        ResourceConfig rc = ResourceConfig.forApplication(new ApplicationConfig());
        return GrizzlyHttpServerFactory.createHttpServer(BASE_URI, rc);
    }

    @BeforeAll
    public static void setUpClass() {
       EMF_Creator.startREST_TestWithDB();
        emf = EMF_Creator.createEntityManagerFactory(DbSelector.TEST, Strategy.CREATE);
        
        httpServer = startServer();
        RestAssured.baseURI = SERVER_URL;
        RestAssured.port = SERVER_PORT;
        RestAssured.defaultParser = Parser.JSON;
    }
    
    @AfterAll
    public static void closeTestServer(){
        EMF_Creator.endREST_TestWithDB();
        httpServer.shutdownNow();
    }
    
    @BeforeEach
    public void setUp() {
        EntityManager em = emf.createEntityManager();
        m1 = new Movie(1933, "Hamlet", new String[]{"Jepser Nielsen","Henrik Poulsen","Freddy Fræk"});
        m2 = new Movie(1933, "Bambie", new String[]{"Ulla Tørnæse","Pia Køl","Freddy Fræk"});
        m3 = new Movie(1999, "The Matrix", new String[]{"Keanu Reeves", "Lawrence Fishburne"});
        m4 = new Movie(2014, "John Wick", new String[]{"Keanu Reeves"});
        try {
            em.getTransaction().begin();
            em.createNamedQuery("Movie.deleteAllRows").executeUpdate();
            em.persist(m1);
            em.persist(m2);
            em.persist(m3);
            em.persist(m4);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }
    
    @Test
    public void testServerIsUp() {
        given().when().get("/movie").then().statusCode(200);
    }
    
    @Test
    public void testIndexMsg() throws Exception {
        given()
        .contentType("application/json")
        .get("/movie/").then()
        .assertThat()
        .statusCode(HttpStatus.OK_200.getStatusCode())
        .body("msg", equalTo("Hello World"));   
    }
    
    @Test
    public void testGetCount() throws Exception {
        given()
        .contentType("application/json")
        .get("/movie/count").then()
        .assertThat()
        .statusCode(HttpStatus.OK_200.getStatusCode())
        .body("count", equalTo(4));   
    }
    
    // There's a randomness in the order of movies in the array,
    // so the .body that I commented out only works at times
    @Test
    public void testGetAll() throws Exception {
        given()
        .contentType("application/json")
        .get("/movie/all")
        .then()
        .log().body()
        .assertThat()
        .statusCode(HttpStatus.OK_200.getStatusCode())
        .body("size()", is(4));
        //.body("[0].actors", hasItem("Keanu Reeves"));   
    }
    
    @Test
    public void testGetByTitle() throws Exception {
        given()
        .contentType("application/json")
        .get("/movie/title/Hamlet").then()
        .assertThat()
        .statusCode(HttpStatus.OK_200.getStatusCode())
        .body("[0].name", equalTo("Hamlet"));   
    }
    
    @Test
    public void testGetByNonExistentTitle() throws Exception {
        given()
        .contentType("application/json")
        .get("/movie/title/IDontExist").then()
        .assertThat()
        .statusCode(HttpStatus.OK_200.getStatusCode())
        .body(equalTo("[]"));   
    }
    
    @Test
    public void testGetByID() throws Exception {
        given()
        .contentType("application/json")
        .get("/movie/id/"+m1.getId()).then()
        .assertThat()
        .statusCode(HttpStatus.OK_200.getStatusCode())
        .body("name", equalTo(m1.getName()));   
    }
}