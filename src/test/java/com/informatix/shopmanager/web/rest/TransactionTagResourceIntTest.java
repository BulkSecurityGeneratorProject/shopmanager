package com.informatix.shopmanager.web.rest;

import com.informatix.shopmanager.ShopManagerApp;

import com.informatix.shopmanager.domain.TransactionTag;
import com.informatix.shopmanager.repository.TransactionTagRepository;
import com.informatix.shopmanager.service.TransactionTagService;
import com.informatix.shopmanager.service.dto.TransactionTagDTO;
import com.informatix.shopmanager.service.mapper.TransactionTagMapper;
import com.informatix.shopmanager.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.informatix.shopmanager.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TransactionTagResource REST controller.
 *
 * @see TransactionTagResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ShopManagerApp.class)
public class TransactionTagResourceIntTest {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final Instant DEFAULT_MODIFIED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_MODIFIED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TransactionTagRepository transactionTagRepository;

    @Autowired
    private TransactionTagMapper transactionTagMapper;

    @Autowired
    private TransactionTagService transactionTagService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTransactionTagMockMvc;

    private TransactionTag transactionTag;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TransactionTagResource transactionTagResource = new TransactionTagResource(transactionTagService);
        this.restTransactionTagMockMvc = MockMvcBuilders.standaloneSetup(transactionTagResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TransactionTag createEntity(EntityManager em) {
        TransactionTag transactionTag = new TransactionTag()
            .value(DEFAULT_VALUE)
            .modified(DEFAULT_MODIFIED);
        return transactionTag;
    }

    @Before
    public void initTest() {
        transactionTag = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransactionTag() throws Exception {
        int databaseSizeBeforeCreate = transactionTagRepository.findAll().size();

        // Create the TransactionTag
        TransactionTagDTO transactionTagDTO = transactionTagMapper.toDto(transactionTag);
        restTransactionTagMockMvc.perform(post("/api/transaction-tags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionTagDTO)))
            .andExpect(status().isCreated());

        // Validate the TransactionTag in the database
        List<TransactionTag> transactionTagList = transactionTagRepository.findAll();
        assertThat(transactionTagList).hasSize(databaseSizeBeforeCreate + 1);
        TransactionTag testTransactionTag = transactionTagList.get(transactionTagList.size() - 1);
        assertThat(testTransactionTag.getValue()).isEqualTo(DEFAULT_VALUE);
        assertThat(testTransactionTag.getModified()).isEqualTo(DEFAULT_MODIFIED);
    }

    @Test
    @Transactional
    public void createTransactionTagWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transactionTagRepository.findAll().size();

        // Create the TransactionTag with an existing ID
        transactionTag.setId(1L);
        TransactionTagDTO transactionTagDTO = transactionTagMapper.toDto(transactionTag);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransactionTagMockMvc.perform(post("/api/transaction-tags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionTagDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TransactionTag in the database
        List<TransactionTag> transactionTagList = transactionTagRepository.findAll();
        assertThat(transactionTagList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkValueIsRequired() throws Exception {
        int databaseSizeBeforeTest = transactionTagRepository.findAll().size();
        // set the field null
        transactionTag.setValue(null);

        // Create the TransactionTag, which fails.
        TransactionTagDTO transactionTagDTO = transactionTagMapper.toDto(transactionTag);

        restTransactionTagMockMvc.perform(post("/api/transaction-tags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionTagDTO)))
            .andExpect(status().isBadRequest());

        List<TransactionTag> transactionTagList = transactionTagRepository.findAll();
        assertThat(transactionTagList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTransactionTags() throws Exception {
        // Initialize the database
        transactionTagRepository.saveAndFlush(transactionTag);

        // Get all the transactionTagList
        restTransactionTagMockMvc.perform(get("/api/transaction-tags?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transactionTag.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())))
            .andExpect(jsonPath("$.[*].modified").value(hasItem(DEFAULT_MODIFIED.toString())));
    }

    @Test
    @Transactional
    public void getTransactionTag() throws Exception {
        // Initialize the database
        transactionTagRepository.saveAndFlush(transactionTag);

        // Get the transactionTag
        restTransactionTagMockMvc.perform(get("/api/transaction-tags/{id}", transactionTag.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transactionTag.getId().intValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.toString()))
            .andExpect(jsonPath("$.modified").value(DEFAULT_MODIFIED.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTransactionTag() throws Exception {
        // Get the transactionTag
        restTransactionTagMockMvc.perform(get("/api/transaction-tags/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransactionTag() throws Exception {
        // Initialize the database
        transactionTagRepository.saveAndFlush(transactionTag);
        int databaseSizeBeforeUpdate = transactionTagRepository.findAll().size();

        // Update the transactionTag
        TransactionTag updatedTransactionTag = transactionTagRepository.findOne(transactionTag.getId());
        // Disconnect from session so that the updates on updatedTransactionTag are not directly saved in db
        em.detach(updatedTransactionTag);
        updatedTransactionTag
            .value(UPDATED_VALUE)
            .modified(UPDATED_MODIFIED);
        TransactionTagDTO transactionTagDTO = transactionTagMapper.toDto(updatedTransactionTag);

        restTransactionTagMockMvc.perform(put("/api/transaction-tags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionTagDTO)))
            .andExpect(status().isOk());

        // Validate the TransactionTag in the database
        List<TransactionTag> transactionTagList = transactionTagRepository.findAll();
        assertThat(transactionTagList).hasSize(databaseSizeBeforeUpdate);
        TransactionTag testTransactionTag = transactionTagList.get(transactionTagList.size() - 1);
        assertThat(testTransactionTag.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testTransactionTag.getModified()).isEqualTo(UPDATED_MODIFIED);
    }

    @Test
    @Transactional
    public void updateNonExistingTransactionTag() throws Exception {
        int databaseSizeBeforeUpdate = transactionTagRepository.findAll().size();

        // Create the TransactionTag
        TransactionTagDTO transactionTagDTO = transactionTagMapper.toDto(transactionTag);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTransactionTagMockMvc.perform(put("/api/transaction-tags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionTagDTO)))
            .andExpect(status().isCreated());

        // Validate the TransactionTag in the database
        List<TransactionTag> transactionTagList = transactionTagRepository.findAll();
        assertThat(transactionTagList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTransactionTag() throws Exception {
        // Initialize the database
        transactionTagRepository.saveAndFlush(transactionTag);
        int databaseSizeBeforeDelete = transactionTagRepository.findAll().size();

        // Get the transactionTag
        restTransactionTagMockMvc.perform(delete("/api/transaction-tags/{id}", transactionTag.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TransactionTag> transactionTagList = transactionTagRepository.findAll();
        assertThat(transactionTagList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransactionTag.class);
        TransactionTag transactionTag1 = new TransactionTag();
        transactionTag1.setId(1L);
        TransactionTag transactionTag2 = new TransactionTag();
        transactionTag2.setId(transactionTag1.getId());
        assertThat(transactionTag1).isEqualTo(transactionTag2);
        transactionTag2.setId(2L);
        assertThat(transactionTag1).isNotEqualTo(transactionTag2);
        transactionTag1.setId(null);
        assertThat(transactionTag1).isNotEqualTo(transactionTag2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransactionTagDTO.class);
        TransactionTagDTO transactionTagDTO1 = new TransactionTagDTO();
        transactionTagDTO1.setId(1L);
        TransactionTagDTO transactionTagDTO2 = new TransactionTagDTO();
        assertThat(transactionTagDTO1).isNotEqualTo(transactionTagDTO2);
        transactionTagDTO2.setId(transactionTagDTO1.getId());
        assertThat(transactionTagDTO1).isEqualTo(transactionTagDTO2);
        transactionTagDTO2.setId(2L);
        assertThat(transactionTagDTO1).isNotEqualTo(transactionTagDTO2);
        transactionTagDTO1.setId(null);
        assertThat(transactionTagDTO1).isNotEqualTo(transactionTagDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(transactionTagMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(transactionTagMapper.fromId(null)).isNull();
    }
}
