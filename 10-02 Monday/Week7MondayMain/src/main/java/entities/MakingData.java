package entities;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import facades.MovieFacade;
import javax.persistence.EntityManagerFactory;
import utils.EMF_Creator;

public class MakingData {
    
    private static final EntityManagerFactory EMF = EMF_Creator.createEntityManagerFactory(
                "pu",
                "jdbc:mysql://localhost:3306/Movie",
                "kumasudosa",
                "PcU41hjKp!l",
                EMF_Creator.Strategy.DROP_AND_CREATE);
    
    private static final MovieFacade FACADE =  MovieFacade.getMovieFacade(EMF);
    private static final Gson GSON = new GsonBuilder().setPrettyPrinting().create();
 
    public static void main(String[] args) {
        Movie movie1 = new Movie(1933, "Hamlet", new String[]{"Jepser Nielsen","Henrik Poulsen","Freddy Fræk"});
        Movie movie2 = new Movie(1933, "Bambie", new String[]{"Ulla Tørnæse","Pia Køl","Freddy Fræk"});
        Movie movie3 = new Movie(1999, "The Matrix", new String[]{"Keanu Reeves", "Lawrence Fishburne"});
        Movie movie4 = new Movie(2014, "John Wick", new String[]{"Keanu Reeves"});
        FACADE.addMovie(movie1);
        FACADE.addMovie(movie2);
        FACADE.addMovie(movie3);
        FACADE.addMovie(movie4);
    }
}