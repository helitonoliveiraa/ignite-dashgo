import { Stack, HStack, Box, Text } from '@chakra-ui/react';
import { PaginationItem } from './PaginationItem';

type PaginationProps = {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter(page => page > 0);
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);

  const previousPage = currentPage > 1
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : [];

  const nextPage = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : [];

  return (
    <Stack
      mt="8"
      spacing="6"
      align="center"
      justify="space-between"
      direction={["column", "row"]}
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>

      <HStack
        spacing="2"
      >
        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {currentPage > (2 + siblingsCount) && (
              <Text color="gray.300" width="8" textAlign="center">...</Text>
            )}
          </>
        )}

        {previousPage.length > 0 && previousPage.map(page => {
          return (
            <PaginationItem onPageChange={onPageChange} key={page} number={page} />
          )
        })}

        <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />

        {nextPage.length > 0 && nextPage.map(page => {
          return (
            <PaginationItem onPageChange={onPageChange} key={page} number={page} />
          )
        })}

        {lastPage > (currentPage + siblingsCount) && (
          <>
            {lastPage > (currentPage + 1 + siblingsCount) && (
              <Text color="gray.300" width="8" textAlign="center">...</Text>
            )}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}

      </HStack>
    </Stack>
  );
}