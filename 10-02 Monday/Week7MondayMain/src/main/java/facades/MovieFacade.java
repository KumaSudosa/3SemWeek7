package facades;

import dto.MovieDTO;
import entities.Movie;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.TypedQuery;

public class MovieFacade {

    private static MovieFacade instance;
    private static EntityManagerFactory emf;
    
    private MovieFacade() {}
    
    public static MovieFacade getMovieFacade(EntityManagerFactory _emf) {
        if (instance == null) {
            emf = _emf;
            instance = new MovieFacade();
        }
        return instance;
    }

    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }
    
    public long getMovieCount(){
        EntityManager em = emf.createEntityManager();
        try{
            long movieCount = (long)em.createQuery("SELECT COUNT(m) FROM Movie m").getSingleResult();
            return movieCount;
        }finally{  
            em.close();
        }
    }
    
    public Movie getMovieById(long id) {
        EntityManager em = emf.createEntityManager();
        return em.find(Movie.class, id);
    }
    
    public List<Movie> getAllMovies(){
        EntityManager em = emf.createEntityManager();
        try{
            TypedQuery<Movie> tq = em.createQuery("SELECT s FROM Movie s", Movie.class);
            return tq.getResultList();
        }finally{  
            em.close();
        }
    }
    
    public List<MovieDTO> getMovieName(String name){
        EntityManager em = emf.createEntityManager();
        try{
            TypedQuery<Movie> tq = em.createQuery("SELECT m FROM Movie m WHERE m.name = :name", Movie.class);
            tq.setParameter("name", name);
            List<Movie> movies = tq.getResultList();
            List<MovieDTO> result = new ArrayList<MovieDTO>();
            for (Movie movie : movies) {
                result.add(new MovieDTO(movie));
            }
            return result;
        }finally{  
            em.close();
        }
    }
    
    public Movie addMovie(Movie movie){
        EntityManager em = emf.createEntityManager();
        try{
            em.getTransaction().begin();
            em.persist(movie);
            em.getTransaction().commit();
            return movie;
        }finally{  
            em.close();
        }
    }
    
    public Movie getMovieID(int id){
        EntityManager em = emf.createEntityManager();
        try{
            TypedQuery<Movie> tq = em.createQuery("SELECT m FROM Movie m WHERE m.id = :id", Movie.class);
            tq.setParameter("id", id);
            Movie result = tq.getSingleResult();
            return result;
        }finally{  
            em.close();
        }
    }
}