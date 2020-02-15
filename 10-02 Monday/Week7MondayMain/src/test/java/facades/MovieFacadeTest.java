package facades;

import utils.EMF_Creator;
import entities.Movie;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.CoreMatchers.everyItem;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.arrayContaining;
import static org.hamcrest.Matchers.hasProperty;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class MovieFacadeTest {
    private static  EntityManagerFactory emf;
    private static  MovieFacade facade;
    private static Movie m1, m2, m3, m4;
    
    public MovieFacadeTest() {
    }
    
    @BeforeAll
    public static void setUpClass() {
          emf = EMF_Creator.createEntityManagerFactory(
                "pu",
                "jdbc:mysql://localhost:3307/startcode_test",
                "dev",
                "ax2",
                EMF_Creator.Strategy.DROP_AND_CREATE);
        facade = MovieFacade.getMovieFacade(emf);
    }
    
    @AfterAll
    public static void tearDownClass() {
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
    
    @AfterEach
    public void tearDown() {
    }

    @Test
    public void testMovieCount() {
        assertEquals(4,facade.getMovieCount(),"Expects four rows in the database");
    }
    
    @Test
    public void testGetAllMovies(){
        List<Movie> movies = facade.getAllMovies();
        movies.forEach(m->{System.out.println(m);});
        assertThat(movies, everyItem(hasProperty("name")));
    }

    @Test
    public void testGetMovieById(){
        Movie movie = facade.getMovieById(m2.getId());
        assertThat(movie.getActors()[0], containsString("Tørnæse"));
    }
}