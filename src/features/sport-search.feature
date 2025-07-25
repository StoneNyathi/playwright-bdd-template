Feature: Sport 2023 Search Results
  As an editor
  I want to ensure that whenever someone searches for "Sport in 2023"
  So that users can access diverse and informative content

  Background:
    Given I am on the BBC website

  @search @sports @content
  Scenario: Search returns minimum required results
    Given I am on the search page
    When I search for "Sport in 2023"
    Then I should see at least 4 search results
    And each result should be relevant to sport content
    And each result should contain a title and description
    And results should include various content types

  @search @sports @quality
  Scenario: Validate search result quality and diversity
    Given I perform a search for "Sport in 2023"
    When I examine the returned results
    Then the results should include diverse sport categories
    And each result should have a clear headline
    And results should span different time periods in 2023
    And I should see articles, reports, and media content
    And the search results count should be displayed

  @search @sports @accessibility
  Scenario: Search results are accessible and well-structured
    Given I search for "Sport in 2023" content
    When I review the search results layout
    Then each result should be properly structured with headings
    And search results should be keyboard navigable
    And results should have appropriate ARIA labels
    And the total count of results should be visible to screen readers