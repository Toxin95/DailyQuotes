<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class RegistrationController extends AbstractController
{
    /**
     * @Route("/register", name="app_register")
     */
    public function register(Request $request): Response
    {
        return $this->render('registration/register.html.twig', []);
    }

    /**
     * @Route("/register", name="register")
     */
    public function SetUser(Request $request, UserPasswordHasherInterface $userPasswordHasherInterface)
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'];
        $password = $data['plainPassword'];
        $user = new User();
        $user->setEmail($email);
        $user->setPassword(
        $userPasswordHasherInterface->hashPassword(
                $user,
                $password
            )
        );
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($user);
        $entityManager->flush();
        return new JsonResponse([
          'success' => true,
            'message' => 'Thank you for registering'
        ]);
    }

    /**
     * @Route("/api/getUserByEmail", name="api_getUserByEmail")
     */
    public function getUserByEmail(Request $request) {
      $data = json_decode($request->getContent(), true);
      $email = $data['email'];

      $entityManager = $this->getDoctrine()->getManager();
      $userRepository = $entityManager->getRepository(User::class);
      $user = $userRepository->findOneByEmail($email);
      var_dump($user);
    }
}
