// import React from 'react';
// import { useAppSelector } from 'store/hooks';
// import {
//   Box,
//   Container,
//   Button,
//   Title,
//   SimpleGrid,
//   Card,
//   Text,
//   Group,
//   Badge,
//   Stack,
//   Flex,
//   Avatar,
//   Anchor,
// } from '@mantine/core';
// import { ROUTES } from 'shared/routes';
// import { Link } from 'react-router-dom';
// import { selectCurrentCompany } from 'features/companies/companiesSlice';

// export default function CompanyDetails() {
//   const companyData = useAppSelector(selectCurrentCompany);

//   const { data, jobs } = companyData;

//   return (
//     <Stack>
//       <Group>
//         <Card shadow='sm' padding='md' radius='md' withBorder>
//           <Avatar />
//           <Text>{data?.userPosition}</Text>
//           <Text>{data?.email}</Text>
//           <Text>
//             {data?.firstName} - {data?.lastName}
//           </Text>
//           <Anchor>{data?.linkedin}</Anchor>
//           <Text>{data?.phone}</Text>
//         </Card>

//         <Card shadow='sm' padding='md' radius='md' withBorder>
//           <Avatar />
//           <Text>{data?.company.name}</Text>
//           <Anchor>{data?.company.webSite}</Anchor>
//           <Anchor>{data?.company.douPage}</Anchor>
//           <Text>{data?.company.employeesCount}</Text>
//         </Card>
//       </Group>

//       <Stack>
//         {jobs.map(
//           ({
//             _id,
//             title,
//             category,
//             country,
//             salaryFrom,
//             englishLevel,
//             summary,
//           }) => (
//             <Card key={_id} shadow='sm' padding='md' radius='md' withBorder>
//               <Flex>
//                 <Group>
//                   <Title order={4}>{title}</Title>

//                   <Text size='sm' c='dimmed'>
//                     {country}
//                   </Text>
//                   <Text size='sm' c='dimmed'>
//                     {category}
//                   </Text>

//                   <Group>
//                     {salaryFrom}
//                     <Badge color='pink' variant='light'>
//                       {englishLevel}
//                     </Badge>
//                   </Group>
//                   <Text>{summary}</Text>
//                 </Group>
//                 <Link to={`${ROUTES.jobs}/${_id}`}>
//                   <Button>See details</Button>
//                 </Link>
//               </Flex>
//             </Card>
//           ),
//         )}
//       </Stack>
//     </Stack>
//   );
// }
