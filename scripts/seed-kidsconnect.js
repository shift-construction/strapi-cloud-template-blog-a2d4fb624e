'use strict';

async function seedKidsConnect() {
  try {
    console.log('Starting KidsConnect seed...');

    // Check if data already exists
    const existingNetworks = await strapi.documents('api::network.network').findMany();
    if (existingNetworks.length > 0) {
      console.log('Networks already exist, skipping seed.');
      return;
    }

    // Create Networks
    const kingston = await strapi.documents('api::network.network').create({
      data: {
        name: 'Kingston upon Thames',
        subdomain: 'kingston',
        latitude: 51.4123,
        longitude: -0.3007,
        radius_km: 5,
        owner_email: 'franchisee.kingston@hellokids.uk',
        settings: {
          theme: 'blue',
          contact_phone: '020 8546 1234',
          welcome_message: 'Welcome to Kingston HelloKids!'
        },
        description: 'Discover the best children\'s events and activities in Kingston upon Thames',
        publishedAt: Date.now()
      }
    });

    const surbiton = await strapi.documents('api::network.network').create({
      data: {
        name: 'Surbiton',
        subdomain: 'surbiton',
        latitude: 51.3947,
        longitude: -0.3047,
        radius_km: 4,
        owner_email: 'franchisee.surbiton@hellokids.uk',
        settings: {
          theme: 'green',
          contact_phone: '020 8399 5678',
          welcome_message: 'Discover family fun in Surbiton!'
        },
        description: 'Find amazing children\'s activities and events in Surbiton',
        publishedAt: Date.now()
      }
    });

    console.log('Networks created:', kingston.documentId, surbiton.documentId);

    // Create Events with proper date handling
    const events = [
      // Little Explorers Playgroup - recurring Monday/Tuesday/Wednesday
      {
        title: 'Little Explorers Playgroup',
        description: 'Fun, interactive playgroup for toddlers with sensory play, music, and storytime. Snacks provided.',
        date_time: new Date('2025-09-15T09:30:00'),
        end_time: new Date('2025-09-15T11:00:00'),
        location_name: 'Kingston Community Centre',
        address: '1 High Street, Kingston KT1 1EU',
        latitude: 51.4103,
        longitude: -0.3060,
        organizer: 'Sarah Mitchell',
        organizer_email: 'sarah@littleexplorers.co.uk',
        price: 5.00,
        is_free: false,
        age_min: 1,
        age_max: 4,
        category: 'playgroup',
        networks: [kingston.documentId]
      },
      // Swimming lessons
      {
        title: 'Splash Time Swimming',
        description: 'Beginner swimming lessons for children. Small groups, qualified instructors.',
        date_time: new Date('2025-09-20T10:00:00'),
        end_time: new Date('2025-09-20T10:45:00'),
        location_name: 'Kingston Leisure Centre',
        address: 'Fairfield Road, Kingston KT1 2PY',
        latitude: 51.4083,
        longitude: -0.3012,
        organizer: 'Mike Thompson',
        organizer_email: 'mike@splashtime.co.uk',
        price: 12.00,
        is_free: false,
        age_min: 4,
        age_max: 8,
        category: 'sports',
        networks: [kingston.documentId, surbiton.documentId]
      },
      // Art workshop
      {
        title: 'Creative Kids Art Workshop',
        description: 'Explore painting, drawing, and crafts in this fun art session. All materials provided.',
        date_time: new Date('2025-09-21T14:00:00'),
        end_time: new Date('2025-09-21T16:00:00'),
        location_name: 'Surbiton Library',
        address: 'Ewell Road, Surbiton KT6 6AG',
        latitude: 51.3923,
        longitude: -0.3047,
        organizer: 'Emma Wilson',
        organizer_email: 'emma@creativekidsart.co.uk',
        price: 15.00,
        is_free: false,
        age_min: 5,
        age_max: 10,
        category: 'arts_crafts',
        networks: [surbiton.documentId]
      },
      // Music class
      {
        title: 'Mini Musicians',
        description: 'Introduction to music through songs, rhythm, and simple instruments. Parent participation welcome.',
        date_time: new Date('2025-09-18T10:30:00'),
        end_time: new Date('2025-09-18T11:15:00'),
        location_name: 'St Marks Church Hall',
        address: 'St Marks Hill, Surbiton KT6 4LS',
        latitude: 51.3968,
        longitude: -0.3078,
        organizer: 'Julia Roberts',
        organizer_email: 'julia@minimusicians.org',
        price: 7.50,
        is_free: false,
        age_min: 0,
        age_max: 3,
        category: 'music',
        networks: [surbiton.documentId]
      },
      // Football
      {
        title: 'Junior Football Club',
        description: 'Fun football training sessions focusing on skills, teamwork, and fitness. All abilities welcome.',
        date_time: new Date('2025-09-20T09:00:00'),
        end_time: new Date('2025-09-20T10:30:00'),
        location_name: 'Kingston Rec Ground',
        address: 'Richmond Road, Kingston KT2 5BT',
        latitude: 51.4167,
        longitude: -0.2983,
        organizer: 'David Martinez',
        organizer_email: 'david@juniorfootball.co.uk',
        price: 10.00,
        is_free: false,
        age_min: 5,
        age_max: 10,
        category: 'sports',
        networks: [kingston.documentId]
      },
      // Ballet
      {
        title: 'Ballet Beginners',
        description: 'Introduction to ballet for young dancers. Focus on posture, grace, and basic positions.',
        date_time: new Date('2025-09-19T16:00:00'),
        end_time: new Date('2025-09-19T17:00:00'),
        location_name: 'Dance Studio Kingston',
        address: 'Wood Street, Kingston KT1 1UJ',
        latitude: 51.4098,
        longitude: -0.3068,
        organizer: 'Anna Petrova',
        organizer_email: 'anna@balletkingston.com',
        price: 9.00,
        is_free: false,
        age_min: 3,
        age_max: 6,
        category: 'dance',
        networks: [kingston.documentId]
      },
      // Science workshop
      {
        title: 'Little Scientists Club',
        description: 'Hands-on science experiments and discoveries. Learn about chemistry, physics, and biology through fun activities.',
        date_time: new Date('2025-10-05T11:00:00'),
        end_time: new Date('2025-10-05T12:30:00'),
        location_name: 'Kingston Library',
        address: 'Fairfield Road, Kingston KT1 2PS',
        latitude: 51.4089,
        longitude: -0.3015,
        organizer: 'Dr. Rachel Green',
        organizer_email: 'rachel@littlescientists.org',
        price: 12.00,
        is_free: false,
        age_min: 6,
        age_max: 11,
        category: 'educational',
        networks: [kingston.documentId]
      },
      // Free story time
      {
        title: 'Rhyme Time at the Library',
        description: 'Songs, rhymes, and stories for babies and toddlers. Free drop-in session.',
        date_time: new Date('2025-09-17T10:00:00'),
        end_time: new Date('2025-09-17T10:30:00'),
        location_name: 'Surbiton Library',
        address: 'Ewell Road, Surbiton KT6 6AG',
        latitude: 51.3923,
        longitude: -0.3047,
        organizer: 'Library Staff',
        organizer_email: 'events@rbklibraries.org',
        price: 0.00,
        is_free: true,
        age_min: 0,
        age_max: 2,
        category: 'educational',
        networks: [surbiton.documentId]
      },
      // Soft play
      {
        title: 'Bounce & Play Soft Play',
        description: 'Indoor soft play session with slides, ball pit, and climbing equipment. Café on site.',
        date_time: new Date('2025-09-22T10:00:00'),
        end_time: new Date('2025-09-22T12:00:00'),
        location_name: 'Bounce & Play Centre',
        address: 'London Road, Kingston KT2 6QS',
        latitude: 51.4145,
        longitude: -0.2950,
        organizer: 'Tom Baker',
        organizer_email: 'info@bounceandplay.co.uk',
        price: 6.50,
        is_free: false,
        age_min: 0,
        age_max: 5,
        category: 'playgroup',
        networks: [kingston.documentId, surbiton.documentId]
      },
      // Drama workshop
      {
        title: 'Drama Kids Theatre Workshop',
        description: 'Build confidence through drama games, improvisation, and performance skills.',
        date_time: new Date('2025-10-11T15:30:00'),
        end_time: new Date('2025-10-11T17:00:00'),
        location_name: 'YMCA Surbiton',
        address: 'Victoria Road, Surbiton KT6 4JZ',
        latitude: 51.3942,
        longitude: -0.3055,
        organizer: 'Sophie Turner',
        organizer_email: 'sophie@dramakids.org.uk',
        price: 11.00,
        is_free: false,
        age_min: 6,
        age_max: 12,
        category: 'arts_crafts',
        networks: [surbiton.documentId]
      },
      // Halloween special
      {
        title: 'Halloween Craft Special',
        description: 'Make spooky decorations and Halloween crafts. Perfect for getting ready for trick-or-treating!',
        date_time: new Date('2025-10-25T10:00:00'),
        end_time: new Date('2025-10-25T12:00:00'),
        location_name: 'Surbiton Community Hall',
        address: 'Victoria Road, Surbiton KT6 4JZ',
        latitude: 51.3945,
        longitude: -0.3052,
        organizer: 'Emma Wilson',
        organizer_email: 'emma@creativekidsart.co.uk',
        price: 8.00,
        is_free: false,
        age_min: 4,
        age_max: 10,
        category: 'arts_crafts',
        networks: [surbiton.documentId]
      },
      // Cooking class
      {
        title: 'Little Chefs Cooking Class',
        description: 'Learn to make simple, healthy snacks and meals. Hands-on cooking fun!',
        date_time: new Date('2025-10-12T10:00:00'),
        end_time: new Date('2025-10-12T12:00:00'),
        location_name: 'Kingston Adult Education',
        address: 'North Kingston Centre, Richmond Road KT2 5PE',
        latitude: 51.4178,
        longitude: -0.2945,
        organizer: 'Chef Marcus',
        organizer_email: 'marcus@littlechefs.co.uk',
        price: 20.00,
        is_free: false,
        age_min: 5,
        age_max: 10,
        category: 'workshop',
        networks: [kingston.documentId]
      },
      // Nature walk
      {
        title: 'Nature Explorers Walk',
        description: 'Guided nature walk in Richmond Park. Spot deer, collect leaves, and learn about wildlife.',
        date_time: new Date('2025-09-28T10:30:00'),
        end_time: new Date('2025-09-28T12:00:00'),
        location_name: 'Richmond Park (Kingston Gate)',
        address: 'Queens Road, Kingston KT1',
        latitude: 51.4175,
        longitude: -0.2867,
        organizer: 'Park Rangers',
        organizer_email: 'education@royalparks.org.uk',
        price: 0.00,
        is_free: true,
        age_min: 3,
        age_max: 10,
        category: 'outdoor',
        networks: [kingston.documentId]
      },
      // Autumn Fair
      {
        title: 'Autumn Fair',
        description: 'Family fun day with stalls, games, face painting, and entertainment. Entry free, activities have small charges.',
        date_time: new Date('2025-10-11T11:00:00'),
        end_time: new Date('2025-10-11T16:00:00'),
        location_name: 'Kingston Market Place',
        address: 'Market Place, Kingston KT1 1JS',
        latitude: 51.4095,
        longitude: -0.3065,
        organizer: 'Kingston Council',
        organizer_email: 'events@kingston.gov.uk',
        price: 0.00,
        is_free: true,
        age_min: 0,
        age_max: 12,
        category: 'other',
        networks: [kingston.documentId, surbiton.documentId]
      },
      // Halloween Party
      {
        title: 'Halloween Party',
        description: 'Spooky fun with games, dancing, trick-or-treating, and costume competition!',
        date_time: new Date('2025-10-31T17:00:00'),
        end_time: new Date('2025-10-31T19:00:00'),
        location_name: 'All Saints Church Hall',
        address: 'Market Place, Kingston KT1 1JP',
        latitude: 51.4092,
        longitude: -0.3061,
        organizer: 'Community Events Team',
        organizer_email: 'halloween@allsaintskingston.org',
        price: 5.00,
        is_free: false,
        age_min: 3,
        age_max: 10,
        category: 'party',
        networks: [kingston.documentId, surbiton.documentId]
      }
    ];

    // Create all events
    for (const eventData of events) {
      await strapi.documents('api::event.event').create({
        data: {
          ...eventData,
          publishedAt: Date.now()
        }
      });
    }

    console.log(`Created ${events.length} events`);

    // Create sample articles
    const articles = [
      {
        title: 'Best Playgroups in Kingston',
        description: 'A comprehensive guide to the top playgroups in Kingston upon Thames',
        slug: 'best-playgroups-kingston',
        category: 'playgroups_classes',
        author_name: 'Sarah Johnson',
        author_email: 'sarah@hellokids.uk',
        network: kingston.documentId,
        featured: true,
        blocks: [
          {
            __component: 'shared.rich-text',
            body: 'Kingston offers a variety of excellent playgroups for toddlers and young children. From sensory play to music sessions, there\'s something for every little one.'
          }
        ],
        publishedAt: Date.now()
      },
      {
        title: 'Top 10 Places to Eat with Kids in Surbiton',
        description: 'Family-friendly restaurants and cafes in Surbiton',
        slug: 'places-to-eat-kids-surbiton',
        category: 'places_to_eat',
        author_name: 'Emma Wilson',
        author_email: 'emma@hellokids.uk',
        network: surbiton.documentId,
        featured: false,
        blocks: [
          {
            __component: 'shared.rich-text',
            body: 'Dining out with children can be challenging, but Surbiton has many welcoming venues that cater to families.'
          }
        ],
        publishedAt: Date.now()
      },
      {
        title: 'Planning the Perfect Kids Birthday Party',
        description: 'Tips and ideas for hosting memorable birthday parties',
        slug: 'perfect-kids-birthday-party',
        category: 'parties_celebrations',
        author_name: 'Mike Thompson',
        author_email: 'mike@hellokids.uk',
        network: kingston.documentId,
        featured: true,
        blocks: [
          {
            __component: 'shared.rich-text',
            body: 'From choosing the right venue to entertainment ideas, here\'s everything you need to know about planning a fantastic birthday party.'
          }
        ],
        publishedAt: Date.now()
      },
      {
        title: 'Parent Resources: Managing Screen Time',
        description: 'Expert advice on balancing technology use for children',
        slug: 'managing-screen-time',
        category: 'parent_resources',
        author_name: 'Dr. Rachel Green',
        author_email: 'rachel@hellokids.uk',
        network: null, // Available to all networks
        featured: false,
        blocks: [
          {
            __component: 'shared.rich-text',
            body: 'In today\'s digital age, managing children\'s screen time is a common concern for parents. Here are evidence-based strategies.'
          }
        ],
        publishedAt: Date.now()
      },
      {
        title: 'About HelloKids Kingston',
        description: 'Learn about our mission to connect families with local activities',
        slug: 'about-hellokids-kingston',
        category: 'about_us',
        author_name: 'HelloKids Team',
        author_email: 'team@hellokids.uk',
        network: kingston.documentId,
        featured: false,
        blocks: [
          {
            __component: 'shared.rich-text',
            body: 'HelloKids Kingston is your local hub for discovering the best children\'s events and activities in the area.'
          }
        ],
        publishedAt: Date.now()
      }
    ];

    // Create articles
    for (const articleData of articles) {
      await strapi.documents('api::article.article').create({
        data: articleData
      });
    }

    console.log(`Created ${articles.length} articles`);

    // Set public permissions
    const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' }
    });

    if (publicRole) {
      const permissions = [
        { action: 'api::network.network.find', role: publicRole.id },
        { action: 'api::network.network.findOne', role: publicRole.id },
        { action: 'api::event.event.find', role: publicRole.id },
        { action: 'api::event.event.findOne', role: publicRole.id },
        { action: 'api::article.article.find', role: publicRole.id },
        { action: 'api::article.article.findOne', role: publicRole.id },
      ];

      for (const perm of permissions) {
        await strapi.query('plugin::users-permissions.permission').create({
          data: perm
        });
      }
      console.log('Public permissions set');
    }

    console.log('KidsConnect seed completed successfully!');
  } catch (error) {
    console.error('Error seeding KidsConnect data:', error);
    throw error;
  }
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await seedKidsConnect();
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});