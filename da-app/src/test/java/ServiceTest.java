import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import com.globits.config.DatabaseConfig;
import com.globits.security.service.UserService;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = DatabaseConfig.class)
//@Transactional(propagation = Propagation.REQUIRED)
public class ServiceTest {

	@Autowired
	UserService service;

//	@Autowired
//	CmsArticleService cmsArticleService;
//	
//	@Autowired
//	CmsCategoryService cmsCategoryService;
//	
//	@Autowired
//	WebsiteService websiteService;
//	@Test
//	public void testSaveWebsite() {
//		Website website = new Website();
//		website.setCode("localhost");
//		website.setDomain("template6.cms.loc");
//		website.setTemplate("template6");
//		websiteService.save(website);
//	}
//	//@Test
//	public void testSaveArticle() {
//		CmsArticle article = new CmsArticle();
//		article.setTitle("Triều Tiên có tân Thủ tướng");
//	}
//	//@Test
//	public void testSaveCategory() {
//		CmsCategoryDto dto = new CmsCategoryDto();
//		dto.setTitle("Kiểm tra thêm chuyên mục");
//		cmsCategoryService.saveCmsCategory(dto, null);
//		
//	}
	
	
}
